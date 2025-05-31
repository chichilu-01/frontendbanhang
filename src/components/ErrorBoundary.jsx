import React from "react";
import Logo from "../header/Logo"; // Đảm bảo đường dẫn đúng

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, showDetail: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.errorInfo = errorInfo;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/30">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <div className="text-7xl mb-4 animate-bounce select-none">😵</div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Oops! Đã có lỗi xảy ra
            </h1>
            <p className="text-gray-600 mb-6">
              Đã xảy ra lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ
              trợ nếu sự cố tiếp diễn.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-2 mx-auto mb-4"
            >
              <span className="animate-spin">🔄</span> Tải lại trang
            </button>
            <button
              onClick={() =>
                this.setState({ showDetail: !this.state.showDetail })
              }
              className="text-xs text-blue-600 underline hover:text-pink-600 transition-colors"
            >
              {this.state.showDetail ? "Ẩn chi tiết lỗi" : "Xem chi tiết lỗi"}
            </button>
            {this.state.showDetail && (
              <pre className="mt-4 text-xs text-left bg-gray-100 rounded-lg p-3 text-red-600 overflow-x-auto">
                {String(this.state.error)}
                {this.errorInfo && (
                  <>
                    <br />
                    {this.errorInfo.componentStack}
                  </>
                )}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
