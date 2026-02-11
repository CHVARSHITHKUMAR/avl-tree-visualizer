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

        svg.innerHTML += `
            <circle cx="${x}" cy="${y}" r="20" fill="#4CAF50"/>
            <text x="${x}" y="${y+5}" text-anchor="middle" fill="white">
                ${node.val}
            </text>
        `;
    }

    draw(node, x, y, gap);
}
