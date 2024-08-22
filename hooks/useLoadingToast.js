import { message } from 'antd';
import { useEffect } from 'react';

message.config({
    bottom: 50,
});

const useLoadingToast = () => {
    const loadingMessage = message;
    const successMessage = message;
    const errorMessage = message;

  const openLoadingToast = (content) => {
    loadingMessage.open({
        type: "loading",
        content: content,
        duration: 0,
      });
  };

  const closeLoadingToast = () => {
    loadingMessage.destroy();
  };

  const openSuccessToast = (content) => {
    successMessage.success({
        content: content,
        duration: 3,
    });
  };

  const openErrorToast = (content) => {
    errorMessage.success({
        content: content,
        duration: 3,
    });
  };

  useEffect(() => {
    return () => {
      // Cleanup function to close the message on component unmount
      closeLoadingToast();
      errorMessage.destroy();
      successMessage.destroy();
    };
  }, []);

  return { openLoadingToast, closeLoadingToast, openSuccessToast, openErrorToast };
};

export default useLoadingToast;
