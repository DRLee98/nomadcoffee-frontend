import { useEffect } from "react";
import styled from "styled-components";

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

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

interface KakaoMapProp {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
}

export const KakaoMap: React.FC<KakaoMapProp> = ({ lat, lng, address }) => {
  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(mapContainer, options);

    if (lat && lng) {
      const position = new window.kakao.maps.LatLng(lat, lng);
      new window.kakao.maps.Marker({
        map,
        position,
      });

      map.setCenter(position);
    } else if (address) {
      getLatLng(address).then(({ lat: addressLat, lng: addressLng }) => {
        const position = new window.kakao.maps.LatLng(addressLat, addressLng);
        new window.kakao.maps.Marker({
          map,
          position,
        });

        map.setCenter(position);
      });
    }
  }, [lat, lng, address]);
  return <Map id="map"></Map>;
};
