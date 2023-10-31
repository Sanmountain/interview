import { useState, useEffect } from "react";
import "../styles/style.css";
import "../styles/reset.css";
import { data } from "../data";

export default function Search({ onClose, onAddItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("전체");

  // 검색창 내 입력값 state
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 자산 옵션 선택 state
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // 검색창 입력값, 옵션 선택시 실행 : 품목검색 리스트 보여주기
  useEffect(() => {
    let results = data.item.filter((item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedOption !== "전체") {
      results = results.filter((item) => item.product === selectedOption);
    }

    setSearchResults(results);
  }, [searchTerm, selectedOption]);

  // 선택 클릭 시 해당 아이템 파라미터 값 저장
  const handleAddItem = (item) => {
    onAddItem(item);
  };

  return (
    <div className="wrapper">
      <div id="srchProduct" className="popup">
        <div className="pop_wrap">
          <div className="size">
            <div className="pop_inner">
              <button
                className="svg pop_close"
                onClick={(e) => {
                  onClose();
                }}
              >
                닫기
              </button>
              <div className="pop_title">
                <div className="sub_tit">
                  <h2>품목검색</h2>
                </div>
              </div>
              <div className="pop_cont">
                <div className="search_area">
                  <div className="searchWrap">
                    <div className="srch_word">
                      <div className="wte_word clear">
                        <select
                          name="P_assettype"
                          id="P_assettype"
                          className="select_drop"
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option value="전체">전체</option>
                          <option value="제품">제품</option>
                          <option value="원재료">원재료</option>
                          <option value="상품">상품</option>
                        </select>
                        <input
                          type="text"
                          name="sval"
                          id="sval"
                          value={searchTerm}
                          onChange={handleChange}
                          placeholder="검색어를 입력해주세요."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tbl_area">
                  <div className="tbl_wrap">
                    <div className="tit_box tit_box2">
                      <h3 className="sTit">검색 결과</h3>
                    </div>
                    <div className="tbl_box tbl_box5 scroll-y">
                      <table id="ser_body">
                        <caption>검색 결과</caption>
                        <colgroup>
                          <col width="100px" />
                          <col width="150px" />
                          <col width="*" />
                          <col width="75px" />
                          <col width="75px" />
                          <col width="70px" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">자산</th>
                            <th scope="col">품목코드</th>
                            <th scope="col">품명</th>
                            <th scope="col">규격</th>
                            <th scope="col">단위</th>
                            <th scope="col">선택</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((item, index) => (
                            <tr key={index}>
                              <td>{item.product}</td>
                              <td>{item.item_code}</td>
                              <td>{item.item_name}</td>
                              <td>{item.standard}</td>
                              <td>{item.unit}</td>
                              <td>
                                <button
                                  className="btns bl wid100"
                                  onClick={() => handleAddItem(item)}
                                >
                                  선택
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <!-- tbl_wrap --> */}
                </div>
                <div className="btnSet">
                  <button
                    className="btn gr"
                    onClick={(e) => {
                      onClose();
                    }}
                  >
                    닫기
                  </button>
                </div>
                {/* <!-- //btnSet --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
