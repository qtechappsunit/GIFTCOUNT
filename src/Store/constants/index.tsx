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
    GET_OWNER_COUPONS: 'owner-coupons'
}

export default endpoints;
