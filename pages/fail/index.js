import React from "react";
import classes from "./fail.module.css";
import { RiCloseCircleFill } from "react-icons/ri";
import Link from "next/link";

const PaymentFail = () => {
  return (
    <div className={classes.failContainer}>
      <div className={classes.failCard}>
        <div className={classes.failIcon}>
          <RiCloseCircleFill
            style={{ width: 100, height: 100, color: "#e74c3c" }}
          />
        </div>
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed.</p>
        <p className={classes.errorDetails}>
          Error Code: <strong>12345</strong>
        </p>
        <p>
          Please try again or{" "}
          <a href="/contact" className={classes.contactLink}>
            contact us
          </a>{" "}
          if the problem persists.
        </p>
        <Link
          href={"/dashboard/superadmin/my-orders"}
          className={classes.retryButton}
        >
          Retry Payment
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
