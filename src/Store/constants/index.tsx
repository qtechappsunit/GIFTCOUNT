export const BASE_URL = 'https://demowebapp.digital/custom/gift_count_app/public/api'

const endpoints = {
    SIGNUP: '/signup',
    LOGIN: '/login',
    EDIT_PROFILE: '/update-profile',
    FORGET_PASSWORD: '/forget-password-email',
    OTP: '/check-forget-password-code',
    RESET_PASSWORD: '/update-forget-password',
    CHANGE_PASSWORD: '/change-password',
    CUISINE_TYPES: '/get-cuisine-types',
    CREATE_COUPON: '/create-discount-coupon',
    GET_COUPONS: '/get-all-coupons',
    COUPON_DETAIL: (id) => `/coupon/${id}/detail`,
    SET_COUPON_STATUS: (id) => `/coupon/${id}/status`,
    GET_OWNER_COUPONS: '/owner-coupons',
    QRCODE_SCAN: '/qr-code-scan',
    SEARCH_COUPONS: (text) => `/search-coupon?search=${text}`,
    FILTER_COUPONS_BY_CUISINES: (id) => `/cuisine/${id}/coupons`,
    EDIT_DISCOUNT_COUPON: (id) => `coupon/${id}/update`,
    DELETE_DISCOUNT_COUPON: (id) => `/coupon/${id}/delete`
    
}

export default endpoints;
