export async function GET() {
  const now = new Date();
  const formattedTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>API Health Status</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(to bottom right, #111827, #1f2937, #111827); /* Tailwind: from-gray-900 via-gray-800 to-gray-900 */
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            color: #fff;
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .card {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(12px);
            padding: 40px 50px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            text-align: center;
            border: 1px solid rgba(255,255,255,0.15);
            animation: pop 0.5s ease;
          }

          @keyframes pop {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          h1 {
            margin: 0 0 20px;
            font-size: 32px;
            font-weight: 700;
            color: #fff;
          }

          .status {
            display: inline-block;
            padding: 10px 18px;
            background: #10b981; /* emerald-500 style green */
            color: #000;
            border-radius: 30px;
            font-weight: bold;
            margin-bottom: 20px;
            animation: pulse 1.5s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.07); }
            100% { transform: scale(1); }
          }

          .time {
            font-size: 18px;
            margin-top: 15px;
            opacity: 0.85;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1> API Health Status</h1>
          <div class="status"> HEALTHY</div>
          <div class="time"> Updated: ${formattedTime}</div>
        </div>
      </body>
    </html>
  `;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
