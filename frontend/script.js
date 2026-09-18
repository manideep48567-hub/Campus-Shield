function scanURL() {

    const urlInput = document.getElementById("urlInput");
    const result = document.getElementById("result");

    const url = urlInput.value.trim();

    // Check if the user entered a URL
    if (url === "") {
        result.innerHTML = "⚠️ Please enter a URL.";
        return;
    }

    // Basic URL validation
    try {
        new URL(url);
    } catch (error) {
        result.innerHTML = "❌ Please enter a valid URL.";
        return;
    }

    // Temporary message
    result.innerHTML = "🔍 Analyzing URL...";

    /*
     * This is a temporary frontend test.
     * Later, this will send the URL to our
     * Python backend and real scanner.
     */

    setTimeout(() => {

        const suspiciousWords = [
            "login",
            "verify",
            "free",
            "winner",
            "password"
        ];

        let suspicious = false;

        for (const word of suspiciousWords) {
            if (url.toLowerCase().includes(word)) {
                suspicious = true;
                break;
            }
        }

        if (suspicious) {

            result.innerHTML = `
                <h3>⚠️ Potentially Suspicious</h3>
                <p>Risk Level: <strong>Medium</strong></p>
                <p>
                    The URL contains characteristics that
                    may require further investigation.
                </p>
            `;

        } else {

            result.innerHTML = `
                <h3>🟢 No Basic Warning Detected</h3>
                <p>Risk Level: <strong>Low</strong></p>
                <p>
                    No obvious suspicious pattern was detected
                    by the basic scanner.
                </p>
            `;

        }

    }, 1000);
}
