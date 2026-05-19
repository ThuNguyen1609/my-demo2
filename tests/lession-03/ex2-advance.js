const chieuCao = 156;

let canNangLyTuong = (chieuCao - 100) * 9 / 10;
let canNangToiDa = chieuCao - 100;
let canNangToiThieu = (chieuCao - 100) * 8 / 10;

if (chieuCao > 100 && chieuCao < 200) {
    console.log(`Cân nặng lý tưởng - Mức cân tối đa - Mức cân tối thiểu lần lượt là: ${canNangLyTuong} - ${canNangToiDa} - ${canNangToiThieu}`);

} else {
    console.log("Không áp dụng với chiều cao <100 và > 200");
}
