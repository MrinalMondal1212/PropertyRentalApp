export const fakeRazorpay = (amount: number) => {
  return new Promise((resolve, reject) => {
    console.log("processing payment off $ ", amount)
    setTimeout(() => {
      const success = Math.random() > 0.2;

      if (success) {
        resolve({
          paymentId: "pay_" + Date.now(),
          status: "success",
          amount,
        });
      } else {
        reject({ status: "failed" });
      }
    }, 2000);
  });
};