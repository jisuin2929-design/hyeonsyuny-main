$ports = @(8080, 8081, 8082, 8085)
$rootDir = (Get-Location).Path

$listener = $null
$activePort = $null

foreach ($p in $ports) {
    try {
        $temp = New-Object System.Net.HttpListener
        $temp.Prefixes.Add("http://127.0.0.1:$p/")
        $temp.Prefixes.Add("http://localhost:$p/")
        $temp.Start()
        $listener = $temp
        $activePort = $p
        break
    } catch {
        if ($temp) { try { $temp.Close() } catch {} }
    }
}

if (-not $listener) {
    Write-Error "Failed to start listener on any port in $($ports -join ', ')"
    exit 1
}

Write-Output "Static server listening at http://localhost:$activePort/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".webp" = "image/webp"
    ".mov"  = "video/quicktime"
    ".mp4"  = "video/mp4"
    ".mp3"  = "audio/mpeg"
    ".ico"  = "image/x-icon"
    ".woff2"= "font/woff2"
}

try {
    while ($listener.IsListening) {
        $context = $null
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Accept-Ranges", "bytes")

            $rawPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
            if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
                $rawPath = "/index.html"
            }

            $localRelPath = $rawPath.TrimStart("/").Replace("/", "\")
            $filePath = Join-Path $rootDir $localRelPath

            if (Test-Path -LiteralPath $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
                $response.ContentType = $contentType

                $fs = [System.IO.File]::Open($filePath, 'Open', 'Read', 'ReadWrite')
                try {
                    $total = $fs.Length
                    $start = 0
                    $end = $total - 1
                    $rangeHeader = $request.Headers["Range"]
                    if ($rangeHeader -and $rangeHeader -match '^bytes=(\d*)-(\d*)$') {
                        if ($Matches[1] -ne '') { $start = [int64]$Matches[1] }
                        if ($Matches[2] -ne '') {
                            if ($Matches[1] -eq '') { $start = [Math]::Max(0, $total - [int64]$Matches[2]) }
                            else { $end = [Math]::Min([int64]$Matches[2], $total - 1) }
                        }
                        $response.StatusCode = 206
                        $response.AddHeader("Content-Range", "bytes $start-$end/$total")
                    } else {
                        $response.StatusCode = 200
                    }
                    $length = $end - $start + 1
                    $response.ContentLength64 = $length

                    if ($request.HttpMethod -ne "HEAD") {
                        $fs.Seek($start, 'Begin') | Out-Null
                        $buffer = New-Object byte[] 65536
                        $remaining = $length
                        while ($remaining -gt 0) {
                            $read = $fs.Read($buffer, 0, [int][Math]::Min($buffer.Length, $remaining))
                            if ($read -le 0) { break }
                            $response.OutputStream.Write($buffer, 0, $read)
                            $remaining -= $read
                        }
                    }
                } finally {
                    $fs.Close()
                }
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $rawPath")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        } catch {
            # Silent catch for client aborts or network interruptions
        } finally {
            if ($context -and $context.Response) {
                try { $context.Response.Close() } catch {}
            }
        }
    }
} finally {
    try { $listener.Stop() } catch {}
    try { $listener.Close() } catch {}
}
