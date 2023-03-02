import React, { useEffect, useMemo, useState } from "react";
import { Form, Input, Modal, Button, Space, Select } from "antd";

import "../../styles/owner/owner-services.css";
import { useDispatch, useSelector } from "react-redux";
import { getBusData } from "../../redux/actions/Owner";
import { useNavigate } from "react-router-dom";
import { items } from "../../assets/data/amenitesData";
import { message } from "antd";
import instance from "../../axios/axios";
function OwnerServices() {
  const dispatch = useDispatch();
  const busData = useSelector((state) => state.Owner.BusData);
  const memoizwBusdata = useMemo((busData) => busData, [busData]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    dispatch(getBusData());
  }, [memoizwBusdata]);
  return (
    <div className="p-3">
      <div className="my-2 d-flex justify-content-end">
        <button className="btn btn-secondary" onClick={showModal}>
          Add Bus
        </button>
      </div>
      <BusResgistraionForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="row m-3">
        {busData.map((item) => {
          return (
            <div className="col-12 col-lg-6">
              <div className={"owner-service__businfo"}>
                <div className="d-flex justify-content-between align-items-center my-1">
                  <h5 className="h5 fw-bold d-inline">{item.Name}</h5>{" "}
                  <h6 className="d-inline">KL 36 J 8900</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center my-3">
                  <h6 className=" d-inline">Seats:{item.Seats.length}</h6>{" "}
                  <h6 className="d-inline">Total Features :{item.Features.length}</h6>
                </div>
                <div className="d-flex justify-content-end align-items-center my-1">
                  <button
                    className="btn btn-dark mx-1"
                    onClick={() => {
                      navigate(`info/${item.id}`);
                    }}
                  >
                    more
                  </button>
                  <button className="btn btn-info mx-1">edit</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default OwnerServices;

export const BusResgistraionForm = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [seatInfos, setseatInfos] = useState({});
  const [Images, setImages] = useState([]);
  const [FormError, setformError] = useState("");
  const [busName, setbusName] = useState("");
  const [amenites, setamenites] = useState([]);
  const [seaclectedIcon, setseaclectedIcon] = useState("");
  const [FeatureError, setFeatureError] = useState("");
  const [featureName, setfeatureName] = useState("");
  const addBg = (id) => {
    const element = document.getElementById(id);
    element.classList.add("btn-info");
  };
  const rmBg = (id) => {
    const element = document.getElementById(id);
    element.classList.remove("btn-info");
  };
  const handleCancel = () => {
    const seatObjs = Object.keys(seatInfos);
   seatObjs.map((item)=>{
    console.log(item);
    rmBg(item)
   })
    setImages([]);
    setseatInfos({});
    setFeatureError("");
    setformError("");
    setamenites([]);
    setbusName("");
    setseaclectedIcon("");
    setfeatureName("");
    setIsModalOpen(false);
  };
  const handleOk = () => {
    console.log(1);
    const formData = new FormData();
    Images.map((img, index) => {
      const textBlob = new Blob([img], { type: img.type });
      formData.append(`${index}`, textBlob, img.name);
    });
    const seatObjs = Object.keys(seatInfos);
    if (!busName) {
      setformError("Please Enter The Bus Name.");
    } else if (seatObjs.length < 38) {
      setformError("Please Fill the Remaining Seat Details:");
    } else if (Images.length < 1) {
      setformError("Please Upload Bus Photos.");
    } else if (amenites.length < 1) {
      setformError("Please aleast 1 Feature of bus.");
    } else {
      console.log(2);
      const data = {
        busName,
        amenites,
        seatInfos,
      };
      formData.append("datas", JSON.stringify(data));
      setformError("");
      console.log(3);
      instance.post("add_bus/", formData).then((res) => {
        if (res.status === 200) {
          seatObjs.map((item)=>{
            rmBg(item)
           })
          setImages([]);
          setseatInfos({});
          setFeatureError("");
          setformError("");
          setamenites([]);
          setbusName("");
          setseaclectedIcon("");
          setfeatureName("");
          messageApi.info("Bus Added Successfully!");
          setIsModalOpen(false);
          dispatch(getBusData());
        } else {
          messageApi.info("Something Went Wrong!");
        }
      });
    }}
    return (
      <Modal
        title="Bus Resgistration Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <>
          {contextHolder}
          <h6>Bus Name:-</h6>
          {FormError && <p className="text-danger">{FormError}</p>}

          <Form.Item label="Bus Name">
            <Input
              value={busName}
              placeholder="Bus Name"
              onChange={(e) => setbusName(e.target.value)}
            />
          </Form.Item>
          <EnterSeatInfo seatInfos={seatInfos} setseatInfos={setseatInfos} />
          <h5 className="mt-2">Aminites:-</h5>
          {FeatureError && <p className="text-danger">{FeatureError}</p>}
          <div className="row">
            {amenites.map((ele) => {
              return (
                <div
                  className="col-3 border m-1"
                  onClick={() => {
                    setamenites(amenites.filter((obj) => obj != ele));
                  }}
                >
                  {ele.featureName} <i className={ele.seaclectedIcon}></i>{" "}
                  <i class="ri-close-line"></i>
                </div>
              );
            })}
          </div>
          <div>
            <Input
              value={featureName}
              className="w-75 m-1"
              placeholder="Enter the Feature"
              onChange={(e) => {
                setfeatureName(e.target.value);
              }}
            />
            <h6>Choose suitable icon:</h6>
            <div className="border w-75 m-1 p-2 row rounded">
              {items.map((item, index) => {
                return (
                  <div className="col-2 m-1">
                    <button
                      className="btn "
                      id={item.icon}
                      onClick={(e) => {
                        if (featureName) {
                          setFeatureError("");
                          if (seaclectedIcon) {
                            console.log("1");
                            rmBg(seaclectedIcon);
                            setseaclectedIcon(item.icon);
                            addBg(item.icon);
                          } else {
                            console.log("2");
                            setseaclectedIcon(item.icon);
                            addBg(item.icon);
                          }
                        } else {
                          setFeatureError("Enter a Feature Name:-");
                        }
                      }}
                    >
                      <i className={item.icon}></i>
                    </button>
                  </div>
                );
              })}
            </div>
            <Button
              type="primary m-1"
              onClick={() => {
                if (featureName) {
                  console.log("hello");
                  setamenites([...amenites, { featureName, seaclectedIcon }]);
                  setfeatureName("");
                  rmBg(seaclectedIcon);
                  setseaclectedIcon("");
                }
              }}
            >
              Add
            </Button>
          </div>
          <h6 className="mt-2">Bus Photos:-</h6>
          <div className="row">
            {Images.map((item) => {
              return (
                <div className="col-6 col-md-4 col-lg-3 position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                    <i
                      className="ri-delete-bin-6-line w-100"
                      onClick={() => {
                        setImages(Images.filter((ele) => ele != item));
                      }}
                    ></i>
                  </span>
                  <img
                    className="w-100"
                    src={URL.createObjectURL(item)}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <Form.Item className="w-75">
            <form id="img-form">
              <Input
                type="file"
                onChange={(e) => {
                  setImages([...Images, e.target.files[0]]);
                }}
                name="bus-pics"
              />
            </form>
          </Form.Item>
        </>
      </Modal>
    );
  };
export const EnterSeatInfo = ({ seatInfos, setseatInfos }) => {
  const [seatNo, setseatNo] = useState("");
  const [errmsg, seterrmsg] = useState("");
  const changeBg = (id) => {
    const item = document.getElementById(id);
    item.classList.add("btn-info");
  };
  const handleClick = (id) => {
    if (!seatInfos[id]) {
      setseatInfos({ ...seatInfos, [id]: "" });
    }
    setseatNo(id);
  };
  return (
    <>
      <h6>Seat Info:-</h6>
      <div className="row">
        <p className="d-flex">
          <div className="seat_obj me-2"></div>Fill details
        </p>
        <p className="d-flex">
          <div className="seat_obj me-2 bg-info "></div>Details filled
        </p>
      </div>
      <div className="row seat_main_row">
        <div className="col-10 d-flex flex-column justify-content-between p-2">
          <div>
            <div className="d-flex seat_row">
              <div
                id="A1"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A1");
                }}
              >
                A1
              </div>
              <div
                id="A2"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A2");
                }}
              >
                A2
              </div>
              <div
                id="A3"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A3");
                }}
              >
                A3
              </div>
              <div
                id="A4"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A4");
                }}
              >
                A4
              </div>
              <div
                id="A5"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A5");
                }}
              >
                A5
              </div>
              <div
                id="A6"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A6");
                }}
              >
                A6
              </div>
              <div
                id="A7"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A7");
                }}
              >
                A7
              </div>
              <div
                id="A8"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("A8");
                }}
              >
                A8
              </div>
            </div>
            <div className="d-flex seat_row">
              <div
                id="B1"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B1");
                }}
              >
                B1
              </div>
              <div
                id="B2"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B2");
                }}
              >
                B2
              </div>
              <div
                id="B3"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B3");
                }}
              >
                B3
              </div>
              <div
                id="B4"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B4");
                }}
              >
                B4
              </div>
              <div
                id="B5"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B5");
                }}
              >
                B5
              </div>
              <div
                id="B6"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B6");
                }}
              >
                B6
              </div>
              <div
                id="B7"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B7");
                }}
              >
                B7
              </div>
              <div
                id="B8"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("B8");
                }}
              >
                B8
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex seat_row">
              <div
                id="C1"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C1");
                }}
              >
                C1
              </div>
              <div
                id="C2"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C2");
                }}
              >
                C2
              </div>
              <div
                id="C3"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C3");
                }}
              >
                C3
              </div>
              <div
                id="C4"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C4");
                }}
              >
                C4
              </div>
              <div
                id="C5"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C5");
                }}
              >
                C5
              </div>
              <div
                id="C6"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C6");
                }}
              >
                C6
              </div>
              <div
                id="C7"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C7");
                }}
              >
                C9
              </div>
              <div
                id="C8"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("C8");
                }}
              >
                C8
              </div>
            </div>
            <div className="d-flex seat_row">
              <div
                id="D1"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D1");
                }}
              >
                D1
              </div>
              <div
                id="D2"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D2");
                }}
              >
                D2
              </div>
              <div
                id="D3"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D3");
                }}
              >
                D3
              </div>
              <div
                id="D4"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D4");
                }}
              >
                D4
              </div>
              <div
                id="D5"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D5");
                }}
              >
                D5
              </div>
              <div
                id="D6"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D6");
                }}
              >
                D6
              </div>
              <div
                id="D7"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D7");
                }}
              >
                D7
              </div>
              <div
                id="D8"
                className="seat_obj text-center"
                onClick={() => {
                  handleClick("D8");
                }}
              >
                D8
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 seat_row">
          <div
            id="E1"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E1");
            }}
          >
            E1
          </div>
          <div
            id="E2"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E2");
            }}
          >
            E2
          </div>
          <div
            id="E3"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E3");
            }}
          >
            E3
          </div>
          <div
            id="E4"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E4");
            }}
          >
            E4
          </div>
          <div
            id="E5"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E5");
            }}
          >
            E5
          </div>
          <div
            id="E6"
            className="seat_obj text-center"
            onClick={() => {
              handleClick("E6");
            }}
          >
            E6
          </div>
        </div>
      </div>
      {seatNo && (
        <div className="container border w-75 r-0 m-3 p-2 rounded">
          {errmsg ? (
            <p className="text-danger">{errmsg}</p>
          ) : (
            <p className="text-primary">Enter {seatNo} Seat Id:</p>
          )}
          <Form.Item label="Seat Id">
            <Input
              className="w-75"
              value={seatInfos[seatNo]}
              onChange={(e) => {
                setseatInfos({ ...seatInfos, [seatNo]: e.target.value });
              }}
            />
            <Button
              onClick={() => {
                if (!seatInfos[seatNo]) {
                  seterrmsg(`Enter ${seatNo} Seat Id `);
                } else {
                  seterrmsg("");
                  changeBg(seatNo);
                  setseatNo("");
                }
              }}
              type="primary"
            >
              Ok
            </Button>
          </Form.Item>
        </div>
      )}
    </>
  );
};
