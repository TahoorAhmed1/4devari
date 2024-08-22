import React from "react";
import { Pagination } from "antd";
import Next from "/public/assets/icons/right_arrow.svg";
import Prev from "/public/assets/icons/left_arrow.svg";
import { useWindowSize } from "../../../utils";
import Image from "next/image";

const Paginate = ({ handlePageChange, data, align }) => {
  const width = useWindowSize().width;

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return (
        <a>
          <Image src={Prev} width={36} height={36} />
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <Image src={Next} width={36} height={36} />
        </a>
      );
    }
    return originalElement;
  };

  return (
    <div className="paginate_container" style={{ justifyContent: align }}>
      {data?.data?.length > 0 && (
        <Pagination
          showSizeChanger={false}
          current={data?.meta?.currentPage || 1}
          total={data?.meta?.totalPages * 10 || 0}
          itemRender={itemRender}
          showLessItems={width < 450 ? true : false}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default Paginate;
