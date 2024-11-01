import client from './client';

const API_BASE = '/api/member';

// 프로필 조회
export const getProfile = (id) => client.get(`${API_BASE}/${id}`);

// 프로필 수정
export const updateProfile = (form) => client.patch(`${API_BASE}/profile`, form);

// 프로필 이미지 수정
export const updateProfileImage = (file) => {
	let formData = new FormData();
	formData.append('file', file);
	return client.post(`${API_BASE}/profile/image`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};
