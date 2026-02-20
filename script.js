// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Load commands from file
async function loadCommands(filename, containerId) {
    try {
        const response = await fetch(filename);
        const text = await response.text();
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        // Parse the file and create command items
        const lines = text.split('\n').filter(line => line.trim());
        lines.forEach(line => {
            // Expected format: "command - description"
            const parts = line.split(' - ');
            if (parts.length >= 1) {
                const command = parts[0].trim();
                const description = parts.length > 1 ? parts.slice(1).join(' - ').trim() : 'No description';
                const item = document.createElement('div');
                item.className = 'command-item';
                item.innerHTML = `
                    <div class="command-name">">${escapeHtml(command)}</div>
                    <div class="command-description">${escapeHtml(description)}</div>
                `;
                container.appendChild(item);
            }
        });
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        document.getElementById(containerId).innerHTML = `<p style="color: red;">Error loading commands file.</p>`;
    }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>'"]/g, m => map[m]);
}

// Load commands when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCommands('unixcommands.txt', 'commands-container');
    loadCommands('dockercmds.txt', 'docker-container');
    loadCommands('bashscripts.txt', 'bash-container');
    loadCommands('iac.txt', 'iac-container');
});