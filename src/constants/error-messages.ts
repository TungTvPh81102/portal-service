export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
  TIMEOUT_ERROR: "Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.",
  UNAUTHORIZED: "Bạn cần đăng nhập để thực hiện hành động này",
  FORBIDDEN: "Bạn không có quyền thực hiện hành động này",
  NOT_FOUND: "Không tìm thấy dữ liệu",
  VALIDATION_ERROR: "Dữ liệu không hợp lệ",
  BAD_REQUEST: "Yêu cầu không hợp lệ",
  SERVER_ERROR: "Lỗi máy chủ nội bộ",
  SERVICE_UNAVAILABLE: "Dịch vụ tạm thời không khả dụng",
  UNKNOWN_ERROR: "Đã xảy ra lỗi không xác định",
} as const;
