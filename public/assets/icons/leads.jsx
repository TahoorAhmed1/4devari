const Leads = ({ width, height }) => {
  var width1 = width || "28px";
  var height1 = height || "24px";
  return (
    <svg
      width={width1}
      height={height1}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2981_3364)">
        <path
          d="M0 10.9344C0.113355 10.2935 0.191105 9.64389 0.398922 9.02334C1.76427 4.95346 4.56181 2.52578 8.77992 1.74392C9.27694 1.65164 9.78631 1.62402 10.295 1.62402C12.0352 1.62475 13.7763 1.62402 15.5165 1.62402C16.0528 1.62402 16.1734 1.74464 16.1734 2.27727C16.1734 3.97251 16.1734 5.66774 16.1734 7.36298C16.1734 7.80259 16.0281 7.95228 15.5885 7.95301C13.8932 7.95519 12.198 7.96173 10.5028 7.9501C9.9142 7.94647 9.34742 8.02204 8.79954 8.23639C8.59754 8.3156 8.40788 8.31196 8.25166 8.13903C8.04093 7.90505 8.13322 7.5737 8.45584 7.4371C9.02988 7.1944 9.63299 7.07669 10.2543 7.06506C10.7527 7.05561 11.2512 7.05779 11.7497 7.06506C11.9357 7.06797 12.0047 7.00184 12.004 6.81146C11.9982 5.46065 12.0004 4.10984 12.0025 2.75975C12.0025 2.6137 11.9778 2.51488 11.7991 2.51415C10.4497 2.50979 9.09165 2.43931 7.7808 2.85204C4.05317 4.02555 1.77589 6.52081 0.989676 10.3582C0.927912 10.6597 0.892307 10.9656 0.879227 11.2745C0.871961 11.4438 0.926459 11.5251 1.10812 11.5244C2.4771 11.5208 3.84607 11.5201 5.21433 11.5244C5.41924 11.5244 5.44903 11.3951 5.4701 11.2454C5.59508 10.3516 5.95477 9.5625 6.52009 8.86348C6.56587 8.8068 6.61092 8.75013 6.66251 8.69926C6.86669 8.49726 7.10866 8.47618 7.2925 8.64186C7.4807 8.81116 7.49886 9.04877 7.31285 9.27185C6.93064 9.72963 6.63562 10.2317 6.45687 10.8036C5.67356 13.3119 7.57443 15.9518 10.2019 15.978C11.9691 15.9954 13.737 15.9823 15.5049 15.9838C16.0572 15.9838 16.1727 16.1008 16.1734 16.653C16.1734 18.3388 16.1734 20.0253 16.1734 21.7111C16.1734 22.1682 16.0317 22.312 15.5725 22.3128C13.7864 22.3142 12.0004 22.3331 10.215 22.3055C8.51034 22.2786 6.9023 21.8463 5.40616 21.0201C5.11042 20.8573 5.01596 20.6146 5.14966 20.3755C5.27464 20.151 5.52315 20.0958 5.81525 20.2535C7.01129 20.9016 8.28581 21.2991 9.64098 21.3936C10.3625 21.4437 11.0906 21.4139 11.8151 21.4212C11.9575 21.4226 12.0025 21.3471 12.0025 21.2155C12.0011 19.8378 12.0004 18.4601 12.0033 17.0817C12.0033 16.9037 11.9095 16.8724 11.762 16.8732C11.3181 16.8761 10.8734 16.8753 10.4294 16.8732C7.88834 16.8637 5.91989 15.2128 5.47301 12.7088C5.4345 12.493 5.35529 12.4065 5.12132 12.4087C3.80684 12.4196 2.49236 12.4196 1.17787 12.4095C0.930818 12.4073 0.861788 12.4959 0.881407 12.7292C1.01293 14.2871 1.50995 15.7185 2.35284 17.0308C2.84623 17.7982 3.44134 18.4783 4.13237 19.0741C4.39832 19.3038 4.44337 19.5777 4.2588 19.7812C4.07642 19.9817 3.82573 19.973 3.56341 19.7419C2.67329 18.9564 1.91468 18.0619 1.32465 17.0272C0.624179 15.7985 0.191105 14.4833 0.0341518 13.078C0.0290654 13.0336 0.0116261 12.9908 0 12.9472C0 12.2765 0 11.6058 0 10.9344ZM15.3196 4.78779C15.3196 4.12655 15.3138 3.46459 15.3233 2.80335C15.3262 2.60062 15.2768 2.50761 15.0522 2.51124C14.4092 2.52287 13.7654 2.52069 13.1223 2.51197C12.9246 2.50906 12.852 2.57373 12.8527 2.77792C12.8592 4.11929 12.8592 5.45993 12.8527 6.80129C12.852 7.00693 12.9283 7.06797 13.1237 7.06579C13.7668 7.05779 14.4106 7.05779 15.0537 7.06579C15.2513 7.06797 15.3262 7.0033 15.3233 6.79911C15.3138 6.12843 15.3196 5.45775 15.3196 4.78779ZM15.3196 19.1751C15.3196 18.5045 15.3138 17.8338 15.3233 17.1638C15.3262 16.9618 15.2782 16.8674 15.053 16.871C14.4099 16.8826 13.7661 16.8804 13.123 16.8717C12.9261 16.8695 12.852 16.932 12.8527 17.1369C12.8592 18.4783 12.8592 19.8189 12.8527 21.1603C12.852 21.3652 12.9268 21.4277 13.123 21.4255C13.7574 21.4175 14.3917 21.4154 15.0261 21.4263C15.247 21.4299 15.3291 21.3616 15.324 21.132C15.3116 20.4795 15.3196 19.8269 15.3196 19.1744V19.1751Z"
          fill="white"
        />
        <path
          d="M24.6945 9.59157C23.8981 9.59157 22.7529 9.81465 22.075 9.29656C21.4602 8.82643 21.4559 8.00243 21.6034 7.31067C21.902 5.90827 23.0712 4.85537 24.5165 4.78344C26.001 4.70932 27.3794 5.69173 27.7703 7.12974C27.952 7.79751 27.9745 8.60844 27.4622 9.13525C26.7814 9.835 25.5752 9.5923 24.6938 9.59157H24.6945ZM24.6916 8.70653C25.2177 8.70653 26.1986 8.90418 26.6695 8.64186C27.1302 8.38536 27.0379 7.78952 26.9187 7.35209C26.6375 6.31736 25.6464 5.61325 24.5768 5.66266C23.5762 5.70844 22.6883 6.43362 22.4623 7.4124C22.3685 7.81786 22.301 8.42097 22.7188 8.6564C23.1707 8.91072 24.1822 8.70726 24.6901 8.70653H24.6916Z"
          fill="white"
        />
        <path
          d="M24.6789 23.9506C23.8789 23.9506 22.7548 24.1788 22.0739 23.6541C21.4613 23.1825 21.4577 22.3665 21.6001 21.674C21.906 20.1924 23.2133 19.1221 24.7348 19.1388C26.2339 19.1548 27.5629 20.2724 27.8194 21.7532C27.9335 22.4123 27.8724 23.1985 27.3093 23.6425C26.6284 24.1788 25.484 23.9506 24.6782 23.9506H24.6789ZM24.6934 23.0655C25.2188 23.0655 26.2012 23.2632 26.6706 23.0009C27.1305 22.7437 27.0368 22.1471 26.9176 21.7096C26.6357 20.6749 25.6439 19.9715 24.5742 20.0217C23.5744 20.0689 22.6872 20.7941 22.4619 21.7721C22.3682 22.1783 22.3006 22.7807 22.7199 23.0154C23.1726 23.269 24.184 23.0663 24.6927 23.0655H24.6934Z"
          fill="white"
        />
        <path
          d="M24.706 4.27407C22.832 4.28715 21.8663 1.97064 23.1619 0.628544C24.4545 -0.709916 26.8234 0.234709 26.8328 2.0978C26.8394 3.31636 25.9114 4.26535 24.706 4.27407ZM24.6813 3.40937C25.3723 3.41737 25.963 2.83679 25.9747 2.13849C25.9936 1.02529 24.5817 0.480311 23.7991 1.22438C22.9904 1.99389 23.5768 3.39557 24.6813 3.40937Z"
          fill="white"
        />
        <path
          d="M24.6981 18.6331C22.827 18.6374 21.8613 16.3093 23.1729 14.9781C24.4939 13.6367 26.8344 14.6221 26.8336 16.4931C26.8336 17.6863 25.8912 18.6309 24.6981 18.6338V18.6331ZM24.7046 15.2324C23.9852 15.2288 23.4105 15.7861 23.4126 16.4873C23.4148 17.61 24.8158 18.1702 25.5976 17.384C26.3824 16.5949 25.8193 15.2382 24.7053 15.2324H24.7046Z"
          fill="white"
        />
        <path
          d="M18.793 2.51416C18.3614 2.51416 16.9917 2.77211 16.9016 2.12396C16.7962 1.36826 18.3643 1.62476 18.7908 1.62476C19.2551 1.62476 20.5478 1.37116 20.6699 1.98299C20.8319 2.79609 19.221 2.51198 18.793 2.51198C18.793 2.51198 18.793 2.51343 18.793 2.51416Z"
          fill="white"
        />
        <path
          d="M18.7636 22.312C18.3341 22.312 16.9877 22.5656 16.9012 21.9204C16.7995 21.1654 18.3647 21.4226 18.7927 21.4226C19.257 21.4226 20.5504 21.169 20.6703 21.783C20.8301 22.5998 19.1945 22.3098 18.7643 22.3098C18.7643 22.3098 18.7643 22.3113 18.7643 22.312H18.7636Z"
          fill="white"
        />
        <path
          d="M18.5833 7.06434C18.9946 7.06434 20.0337 6.84562 20.131 7.44219C20.2531 8.18989 18.8427 7.95664 18.4452 7.95664C18.0536 7.95664 16.9934 8.14557 17.008 7.49959C17.0232 6.84271 18.1742 7.06434 18.5826 7.06506L18.5833 7.06434Z"
          fill="white"
        />
        <path
          d="M18.5491 16.8732C18.1415 16.8732 17.1264 17.0861 17.0196 16.5033C16.8837 15.76 18.2003 15.9816 18.5731 15.9816C18.9735 15.9816 20.1397 15.7658 20.1405 16.4263C20.1419 17.0992 18.9575 16.8732 18.5484 16.8732H18.5491Z"
          fill="white"
        />
        <path
          d="M20.7896 19.5922C20.435 19.5922 19.1736 19.7114 19.5151 18.9644C19.7207 18.5132 20.6516 18.6999 21.0287 18.7014C21.3811 18.7028 22.232 18.66 22.0263 19.2849C21.8774 19.7368 21.1369 19.5937 20.7896 19.5937V19.5922Z"
          fill="white"
        />
        <path
          d="M21.0482 5.23031C20.7154 5.23031 20.0164 5.31533 20.0156 4.78779C20.0156 4.27333 20.6943 4.34091 21.0358 4.34018C21.3919 4.34018 22.0458 4.25735 22.0437 4.78924C22.0415 5.3146 21.397 5.23176 21.0482 5.23176C21.0482 5.23176 21.0482 5.23104 21.0482 5.23031Z"
          fill="white"
        />
        <path
          d="M18.1661 5.22887C17.8239 5.22887 17.228 5.29572 17.2266 4.7878C17.2251 4.28351 17.8333 4.34019 18.1806 4.34019C18.5185 4.34019 19.1485 4.28206 19.1449 4.78852C19.142 5.29935 18.4989 5.22814 18.1661 5.22887Z"
          fill="white"
        />
        <path
          d="M17.89 19.6017C17.2237 19.5893 16.9418 18.8707 17.688 18.7145C17.9184 18.6665 18.3289 18.6709 18.4968 18.8656C18.7191 19.1236 18.5527 19.5014 18.2395 19.5704C18.1262 19.5952 18.007 19.5922 17.8907 19.6024L17.89 19.6017Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2981_3364">
          <rect width="27.8882" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Leads;