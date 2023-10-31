import { useState, useEffect } from "react";
import "../styles/reset.css";
import "../styles/style.css";
import Search from "./Search.js";

export default function Main() {
  const [isPopupOn, setIsPopupOn] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  //팝업 오픈
  const handlePopupOn = () => {
    setIsPopupOn(true);
  };

  //팝업 닫기
  const handlePopupOff = () => {
    setIsPopupOn(false);
  };

  //품목검색 내 검색결과 선택 후 주문정보 추가
  const handleAddItem = (item) => {
    // 이미 선택된 품목 중에 현재 추가하려는 품목이 있는지 확인
    const isItemExist = selectedItems.some(
      (selectedItem) => selectedItem.item_code === item.item_code
    );

    if (!isItemExist) {
      // 만약 품목이 존재하지 않으면 품목을 추가
      setSelectedItems((prevItems) => [
        ...prevItems,
        { ...item, isChecked: false },
      ]);
    }
  };

  //체크박스 모두 선택
  const handleAllCheck = () => {
    setIsAllChecked(!isAllChecked);
  };

  useEffect(() => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isChecked: isAllChecked,
      }))
    );
  }, [isAllChecked]);

  // 체크박스 개별 선택
  const handleCheckItem = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  };

  //품목 삭제
  const handleDelete = () => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => !item.isChecked)
    );
  };

  /* 계산 부분 */
  // 품목의 수량 변경
  const handleQuantityChange = (index, quantity) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const total = Number(quantity) * item.price; // 공급가액 계산
          const tax = total * 0.1; // 부가세 계산
          return {
            ...item,
            quantity: Number(quantity), // 숫자로 변환
            total: total, // 공급가액 업데이트
            tax: tax, // 부가세 업데이트
            sum: total + tax, // 합계 계산
          };
        }
        return item;
      })
    );
  };

  // 품목의 단가 변경
  const handlePriceChange = (index, price) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const total = item.quantity * Number(price); // 공급가액 계산
          const tax = total * 0.1; // 부가세 계산
          return {
            ...item,
            price: Number(price), // 숫자로 변환
            total: total, // 공급가액 업데이트
            tax: tax, // 부가세 업데이트
            sum: total + tax, // 합계 계산
          };
        }
        return item;
      })
    );
  };

  // 품목의 할인단가 변경
  const handleDiscountPriceChange = (index, discountPrice) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          const discountTotal = item.quantity * Number(discountPrice); // 할인된 가격 계산
          const total = item.quantity * item.price - discountTotal; // 공급가액 계산 (원래 가격 - 할인된 가격)
          const tax = total * 0.1; // 부가세 계산
          return {
            ...item,
            discountPrice: Number(discountPrice), // 숫자로 변환
            total: total, // 공급가액 업데이트
            tax: tax, // 부가세 업데이트
            sum: total + tax, // 합계 계산
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="wrapper">
      <div id="sub">
        <div className="sec_wrap">
          <div className="section section1">
            <div className="inner">
              <div className="board tbl_area">
                <div className="tbl_wrap tbl_wrap3">
                  <div className="tit_box tit_box2">
                    <h3 className="sTit">주문정보</h3>
                    <button className="more_btn" onClick={handlePopupOn}>
                      추가 +
                    </button>
                  </div>
                  <div className="tbl_box tbl_box3">
                    <table>
                      <caption>주문정보</caption>
                      <colgroup>
                        <col width="60px" />
                        <col width="80px" />
                        <col width="110px" />
                        <col width="110px" />
                        <col width="125px" />
                        <col width="*" />
                        <col width="125px" />
                        <col width="125px" />
                        <col width="125px" />
                        <col width="125px" />
                        <col width="125px" />
                        <col width="125px" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope="col" className="chk_th">
                            <div className="check_box">
                              <input
                                type="checkbox"
                                name="allChk"
                                id="allChk"
                                checked={isAllChecked}
                                onChange={handleAllCheck}
                              />
                              <label htmlFor="allChk">전체선택</label>
                            </div>
                          </th>
                          <th scope="col">No</th>
                          <th scope="col">사업자</th>
                          <th scope="col">자산구분</th>
                          <th scope="col">품목코드</th>
                          <th scope="col">품명</th>
                          <th scope="col">수량</th>
                          <th scope="col">단가</th>
                          <th scope="col">할인단가</th>
                          <th scope="col">공급가액</th>
                          <th scope="col">부가세</th>
                          <th scope="col">합계</th>
                        </tr>
                      </thead>
                      <tbody id="tr_wrapper2">
                        {selectedItems.map((item, index) => (
                          <tr key={index}>
                            <td className="chk_td">
                              <div className="check_box">
                                <input
                                  type="checkbox"
                                  name="no"
                                  id={`no${index + 1}`}
                                  checked={item.isChecked}
                                  onChange={() => handleCheckItem(index)}
                                />
                                <label htmlFor={`no${index + 1}`}>
                                  {index + 1}
                                </label>
                              </div>
                            </td>
                            <td>{index + 1}</td>
                            <td>우림</td>
                            <td>{item.product}</td>
                            <td>{item.item_code}</td>
                            <td>
                              <div className="cont txt_l">
                                <div>
                                  <p className="p_name">{item.item_name}</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.quantity || ""}
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                                className="txt_r"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.price || ""}
                                onChange={(e) =>
                                  handlePriceChange(index, e.target.value)
                                }
                                className="txt_r"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.discountPrice || ""}
                                onChange={(e) =>
                                  handleDiscountPriceChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                className="txt_r"
                              />
                            </td>
                            <td className="txt_r">{item.total || "0"}원</td>
                            <td className="txt_r">{item.tax || "0"}원</td>
                            <td className="txt_r">{item.sum || "0"}원</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="total">
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td>합계</td>
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td className="space">여백</td>
                          <td className="txt_r">0원</td>
                          <td className="txt_r">0원</td>
                          <td className="txt_r">0원</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="btnSet btnSet2 clear mt10">
                  <div className="right">
                    <button className="btn lineBl small" onClick={handleDelete}>
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOn && (
        <Search onClose={handlePopupOff} onAddItem={handleAddItem} />
      )}
    </div>
  );
}
