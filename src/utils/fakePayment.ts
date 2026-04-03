export const fakeRazorpay = (amount: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;

      if (success) {
        resolve({
          paymentId: "pay_" + Date.now(),
          status: "success",
        });
      } else {
        reject({ status: "failed" });
      }
    }, 2000);
  });
};