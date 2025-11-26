/**
 * 테이블 요정 어시스트 - Google Apps Script Backend
 * 
 * 스프레드시트에서 데이터를 읽어 웹앱으로 제공합니다.
 */

// ==== 설정 ====
// 아래 스프레드시트 ID를 본인의 스프레드시트 ID로 변경하세요
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // 스프레드시트 URL에서 /d/ 와 /edit 사이의 문자열

// ==== 웹앱 진입점 ====
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('테이블 요정 어시스트')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ==== 데이터 읽기 함수 ====

/**
 * 스프레드시트에서 모든 데이터를 읽어 테이블 구조로 반환
 */
function getTableData() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Sheet 읽기
    const artistSheet = ss.getSheetByName('artist_list');
    const tableSheet = ss.getSheetByName('table_info');
    
    if (!artistSheet || !tableSheet) {
      throw new Error('필수 시트가 없습니다. artist_list와 table_info 시트를 확인하세요.');
    }
    
    // 작가 정보 읽기
    const artistData = artistSheet.getDataRange().getValues();
    const artistHeaders = artistData[0];
    const artistMap = {};
    
    for (let i = 1; i < artistData.length; i++) {
      const row = artistData[i];
      const uuid = row[artistHeaders.indexOf('작가 UUID')];
      if (uuid) {
        artistMap[uuid] = {
          uuid: uuid,
          name: row[artistHeaders.indexOf('작가명')] || '',
          category: row[artistHeaders.indexOf('분류')] || '',
          sector: row[artistHeaders.indexOf('부문')] || '',
          url: row[artistHeaders.indexOf('URL')] || ''
        };
      }
    }
    
    // 테이블 정보 읽기
    const tableData = tableSheet.getDataRange().getValues();
    const tableHeaders = tableData[0];
    const tables = {};
    
    for (let i = 1; i < tableData.length; i++) {
      const row = tableData[i];
      const tableName = row[tableHeaders.indexOf('테이블')];
      const fairy1 = row[tableHeaders.indexOf('테요1')];
      const fairy2 = row[tableHeaders.indexOf('테요2')];
      const artistUuid = row[tableHeaders.indexOf('작가 UUID')];
      
      if (!tableName) continue;
      
      // 테이블 초기화
      if (!tables[tableName]) {
        tables[tableName] = {
          table_name: tableName,
          fairy1: fairy1,
          fairy2: fairy2,
          artists: []
        };
      }
      
      // 작가 추가
      if (artistUuid && artistMap[artistUuid]) {
        tables[tableName].artists.push(artistMap[artistUuid]);
      }
    }
    
    // 배열로 변환
    return Object.values(tables);
    
  } catch (error) {
    Logger.log('데이터 읽기 오류: ' + error.message);
    throw error;
  }
}

/**
 * HTML에서 호출 가능한 데이터 제공 함수
 */
function getDataForWeb() {
  return JSON.stringify(getTableData());
}

// ==== 유틸리티 함수 ====

/**
 * 스프레드시트 ID를 확인하는 함수
 */
function checkSpreadsheetId() {
  if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
    throw new Error('SPREADSHEET_ID를 설정하세요! Code.gs 파일 상단의 SPREADSHEET_ID 변수를 수정하세요.');
  }
  return '스프레드시트 ID가 설정되었습니다: ' + SPREADSHEET_ID;
}

/**
 * 테스트 함수 - 스크립트 에디터에서 실행하여 데이터 확인
 */
function testGetData() {
  const data = getTableData();
  Logger.log('총 테이블 수: ' + data.length);
  Logger.log(JSON.stringify(data, null, 2));
}
