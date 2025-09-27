const blk_pitn = {
        block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
        block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
        block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
        block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
        block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
        block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
        block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]], /* 3 */
        block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
        block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
        block11: [[2, 0], [0, 0], [-1, 0], [1, 0]], /* — */
        block12: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
        block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]], /* 7 */
        block17: [[0, 1], [0, 0], [-1, 0], [0, -1]], /* 2 */
        block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block19: [[0, -1], [0, 0], [-1, 0], [1, 0]], /* 9 */
        block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
        block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]], /* 1 */
        block22: [[1, 1], [0, 0], [-1, 0], [1, 0]], /* 14 */
        block23: [[0, 2], [0, 0], [0, -1], [0, 1]]      /* | */
    },
    offset_pitn = {
        block1: [5, 3], block2: [5, 1], block3: [3, 4], block4: [3, 2],
        block5: [3, -1], block6: [2, 5], block7: [2, 1], block8: [1, -1],
        block9: [1, -3], block10: [1, 2], block11: [0, 3], block12: [0, 0],
        block13: [-1, -4], block14: [0, -2], block15: [-2, 4], block16: [-2, 2],
        block17: [-2, 0], block18: [-3, -2], block19: [-4, 0], block20: [-3, 5],
        block21: [-5, 3], block22: [-4, 1], block23: [-6, 1]
    };

const love = document.querySelector(".love"),
      block = love.querySelector(".block");
let timer = null, index = 0;

function Next() {
    if (++index >= 24) {
        clearInterval(timer);
        Rise();
        return;
    }

    block.style.visibility = "visible";
    const offsetX = 40 * offset_pitn["block" + index][0];
    const offsetY = 40 * offset_pitn["block" + index][1];
    
    block.style.left = `calc(50% + ${offsetX}px)`;
    block.style.top = `calc(50% - ${offsetY}px)`;
    block.style.transform = 'translate(-50%, -50%)';

    for (let i = 0; i < block.children.length; i++) {
        block.children[i].style.left = (blk_pitn["block" + index][i][0] * -40) + "px";
        block.children[i].style.top = (blk_pitn["block" + index][i][1] * -40) + "px";
    }

    const clone_block = block.cloneNode(true);
    love.appendChild(clone_block);

    if (love.children.length >= 24) {
        if (love.lastChild.children[2]) {
             love.lastChild.children[2].style.display = "none";
        }
        block.style.display = "none";
    }
}

function Rise() {
    console.log("Animasi naik dimulai oleh CSS");
    love.classList.add('is-rising');

    setTimeout(() => {
        const message = document.getElementById("love-message");
        message.classList.add("show");
    }, 500);
}

// --- BAGIAN AUDIO YANG DIPERBAIKI ---
window.onload = function () {
    const audio = document.getElementById('backgroundMusic');
    
    // Fungsi untuk mencoba memutar audio
    async function playAudio() {
        try {
            // Coba putar audio
            await audio.play();
            console.log("Audio berhasil diputar otomatis.");
        } catch (err) {
            // Jika gagal (karena diblokir browser), tampilkan pesan di console
            console.log("Autoplay diblokir oleh browser. Menunggu interaksi pengguna.");
            // Siapkan event listener: saat pengguna klik/sentuh layar, putar musik
            // 'once: true' berarti listener ini akan otomatis dihapus setelah dijalankan
            document.body.addEventListener('click', () => audio.play(), { once: true });
            document.body.addEventListener('touchend', () => audio.play(), { once: true });
        }
    }

    // Panggil fungsi untuk memutar audio
    playAudio();

    // Jalankan timer untuk animasi hati
    setTimeout(() => {
        timer = setInterval(Next, 300);
    }, 12000);
};