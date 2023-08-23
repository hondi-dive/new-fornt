/** yyyy-mm-dd to yyyy년 mm월 dd일 */
export const convertDashToKorean = (str: string) => {
  const _str = str.split('-');
  if (_str.length !== 3) throw 'format error: input date 포맷은 yyyy-mm-dd 입니다.';
  return `${Number(_str[0])}년 ${Number(_str[1])}월 ${Number(_str[2])}일`;
};
