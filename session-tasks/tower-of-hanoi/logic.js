const finalTower = document.getElementById("finalTower");
const initialTower = document.getElementById("initialTower");

async function towerOfHanoi(n, source, destination, auxiliary) {
    if (n === 1) {
        console.log(`Move disc ${n} from ${source} to ${destination}`);
        return;
    }
    towerOfHanoi(n - 1, source, auxiliary, destination);
    console.log(`Move disc ${n} from ${source} to ${destination}`);
    towerOfHanoi(n - 1, auxiliary, destination, source);
}

async function solveTowerOfHanoi() {
    initialTower.style.display = "block";
    finalTower.style.display = "none";

    const discs = 5;
    const source = 'A';
    const destination = 'C';
    const auxiliary = 'B';
    console.log(`Solving Tower of Hanoi for ${discs} discs...`);
    await towerOfHanoi(discs, source, destination, auxiliary);

    let promise = new Promise((res, rej) => {
        setTimeout(res, 2000);
    }).then(val => {
        finalTower.style.display = "block";
        initialTower.style.display = "none";
    });
}

solveTowerOfHanoi();
