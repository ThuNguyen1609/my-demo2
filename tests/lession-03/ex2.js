const chieuCao = 201;

let canNangLyTuong = 0;
let canNangToiDa = 0;
let canNangToiThieu = 0;

if (chieuCao > 100 && chieuCao < 200) {
    canNangLyTuong = 56 * 9 / 10;
    canNangToiDa = 56;
    canNangToiThieu = 56 * 8 / 10;
} else {
    canNangLyTuong = 'undefine';
    canNangToiDa = 'undefine';
    canNangToiThieu = 'undefine';
}

console.log(`Cân nặng lý tưởng - Mức cân tối đa - Mức cân tối thiểu lần lượt là: ${canNangLyTuong} - ${canNangToiDa} - ${canNangToiThieu}`);
