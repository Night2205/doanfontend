import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllUsers, deleteUser } from "../../services/userService"
import ReactPaginate from "react-paginate";
import '../ManageUsers/Users.scss';  // Import file CSS
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);//chỉnh giới hạn số lượng users trong một trang
    const [totalPages, setTotalPages] = useState(0);
    //----------------------------Modal delete-------------------
    //ẩn hiện bảng thông báo xoá người dùng
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    //dùng cho hàm delete user
    const [dataModel, setDataModel] = useState({});

    //----------------------------Modal create/edit---------------
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    //quản lý modal bằng action để gọi chức năng cập nhật
    const [actionModalUser, setActionModalUser] = useState("CREATE");

    //sử dụng cho modal của edit
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages);
            setListUsers(response.data.DT.users);
        }
    }

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = (user) => {
        setDataModel(user);
        setIsShowModalDelete(true);

    }

    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModel({});
    }

    const confirmDeleteUser = async () => {
        let response = await deleteUser(dataModel);
        if (response && response.data.EC === 0) {
            toast.success(response.data.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.data.EM);
        }
    }

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();
    }

    const handleRefeshPage = async () => {
        await fetchUsers();
    }

    const handleEditUser = (user) => {
        // console.log("check data user", user)
        setActionModalUser("UPDATE");
        setDataModalUser(user);
        setIsShowModalUser(true);
    }



    return (
        <>
            <div className="container">

                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>
                                Table Users
                            </h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success  mb-3" onClick={handleRefeshPage}>Refresh</button>
                            <button className="btn btn-primary mx-3 mb-3"
                                onClick={() => { setIsShowModalUser(true); setActionModalUser("CREATE") }}>
                                {/* chọn create nếu sử dụng add new users */}
                                Add new Users
                            </button>
                        </div>
                    </div>
                    <div className="user-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUsers && listUsers.length > 0 ?
                                        <>
                                            {listUsers.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        {/* Công thức tính stt id */}
                                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.Group ? item.Group.name : ''}</td>
                                                        <td>
                                                            <button className="btn btn-warning mx-3"
                                                                onClick={() => handleEditUser(item)}
                                                            >Edit</button>
                                                            <button className="btn btn-danger"
                                                                onClick={() => handleDeleteUser(item)}
                                                            >Delete</button>
                                                        </td>
                                                    </tr>
                                                )

                                            })}
                                        </>
                                        :
                                        <><tr><td>Not found any users</td></tr></>
                                }
                            </tbody>
                        </table>

                    </div>

                    {totalPages > 0 &&
                        <div className="user-footer">
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPages}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }
                </div>

            </div>

            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModel={dataModel}
            />

            <ModalUser
                // title={" Create New User "}
                onHide={onHideModalUser}
                show={isShowModalUser}
                onUserAdded={fetchUsers}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
            {/* ẩn hiện thông báo */}

        </>
    )
}

export default Users;
//----------------Phân trang------------------

//count: => đếm tổng số : sum users => sum pages

//total (size) : số lượng lấy ra (limit)

//page ? (offset)

//select * from users limit 5 offset 10

//select * from users limit 5 offset 25