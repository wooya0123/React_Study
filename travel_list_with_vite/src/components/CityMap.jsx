import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function CityMap() {
  const { city } = useParams(); // URL 파라미터로 받은 city 값
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 }); // 초기 지도 좌표
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (!city) return; // city 값이 없으면 처리하지 않음

    // 카카오맵 Geocoder API 사용
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(city, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0]; // 검색된 첫 번째 결과의 좌표
        setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) }); // 좌표 업데이트
      } else {
        setError("해당 주소를 찾을 수 없습니다."); // 검색 실패 처리
      }
    });
  }, []); // city가 변경될 때마다 실행

  return (
    <div>
      <h2>{city} 지도</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Map
        center={coordinates} // 업데이트된 좌표로 지도 중심 이동
        style={{
          width: "500px",
          height: "500px",
        }}
        level={3} // 확대 레벨
      >
        {/* 지도에 마커 추가 */}
        <MapMarker position={coordinates}>
          <div style={{ color: "#000" }}>{city}</div>
        </MapMarker>
      </Map>
    </div>
  );
}

export default CityMap;
