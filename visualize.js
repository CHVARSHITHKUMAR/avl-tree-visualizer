function drawTree(node, x = 600, y = 50, gap = 200) {

    let svg = document.getElementById("tree");
    svg.innerHTML = "";

    function draw(node, x, y, gap) {
        if (!node) return;

        if (node.left) {
            svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${x-gap}" y2="${y+80}" stroke="black"/>`;
            draw(node.left, x-gap, y+80, gap/1.5);
        }

        if (node.right) {
            svg.innerHTML += `<line x1="${x}" y1="${y}" x2="${x+gap}" y2="${y+80}" stroke="black"/>`;
            draw(node.right, x+gap, y+80, gap/1.5);
        }

        let bf = height(node.left) - height(node.right);

        svg.innerHTML += `
            <circle cx="${x}" cy="${y}" r="22" fill="#4CAF50"/>
            <text x="${x}" y="${y+4}" text-anchor="middle" fill="white" font-size="12">
                ${node.val}
            </text>
            <text x="${x}" y="${y+35}" text-anchor="middle" fill="black" font-size="12">
                BF:${bf}
            </text>
        `;

    }
    



    draw(node, x, y, gap);
}
function toggleTheme() {
     document.body.classList.toggle("dark");
}
