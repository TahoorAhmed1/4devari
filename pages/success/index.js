import React from "react";
import classes from "./success.module.css";
import success from "../../public/assets/icons/success.png";
import Image from "next/image";
const PaymentThankYou = () => {
  return (
    <div className={classes.thankyouContainer}>
      <div className={classes.thankyouCard}>
        <div className={classes.thankyouIcon}>
          <Image
            width={1000}
            height={1000}
            style={{ width: 100, height: 100 }}
            src={success}
            alt="Thank You"
          />
        </div>
        <h1>Thank You!</h1>
        <p>Your payment was successful.</p>
        <p className={classes.orderNumber}>
          Order Number: <strong>#12345</strong>
        </p>
        <p>
          We appreciate your business! If you have any questions, feel free to{" "}
          <a href="/contact" className={classes.contactLink}>
            contact us
          </a>
          .
        </p>
        <button className={classes.thankyouButton}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default PaymentThankYou;
