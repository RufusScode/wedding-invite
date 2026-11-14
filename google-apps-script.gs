// Дата ответа | Имя | Придёт | Формат | Гостей | Спутники | Алкоголь | Аллергии | Комментарий

var SHEET_NAME = 'Ответы гостей';

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
  var d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    d.created || new Date().toISOString(),
    d.name || '',
    d.coming || '',
    d.party || '',
    d.guests != null ? d.guests : '',
    d.companions || '',
    d.drinks || '',
    d.allergy || '',
    d.note || ''
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Дата ответа', 'Имя', 'Придёт', 'Формат', 'Гостей', 'Спутники', 'Алкоголь', 'Аллергии', 'Комментарий']);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
  }
}
