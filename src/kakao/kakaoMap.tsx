declare global {
  interface Window {
    kakao: any;
  }
}

export const getLatLng = async (
  address: string,
): Promise<{ lat?: number; lng?: number }> => {
  let lat: number, lng: number;
  const geocoder = new window.kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, function (result: any, status: any) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        lat = result[0].y;
        lng = result[0].x;
        resolve({ lat, lng });
      }
    });
  });
};
