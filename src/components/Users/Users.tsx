import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}


const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                <div>
                    {pages.map(p => {
                        return <span className={props.currentPage === p ? styles.selectedPage : ""}
                                     onClick={() => {
                                         props.onPageChanged(p)
                                     }}>{p} </span>
                    })}
                </div>
                {
                    props.users.map(u => <div key={u.id}>
                <span>
                <div>
                    <NavLink to={"/profile/" + u.id}>
                <img className={styles.userPhoto} src={u.photos.small ? u.photos.small : userPhoto} alt={"userPhoto"}/>
                        </NavLink>
                </div>
                <div>
            {u.followed
                ? <button onClick={() => {
                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
                        withCredentials: true,
                        headers: {
                            "API-KEY": "5387a064-53c2-41e2-a48f-3c0a2fb2fa92"
                        }
                    })
                        .then(response => {
                            if (response.data.resultCode === 0) {
                                props.unfollow(u.id)
                            }
                        })
                }}>Unfollow</button>
                : <button onClick={() => {
                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                        withCredentials: true,
                        headers: {
                            "API-KEY": "5387a064-53c2-41e2-a48f-3c0a2fb2fa92"
                        }
                    })
                        .then(response => {
                            if (response.data.resultCode === 0) {
                                props.follow(u.id)
                            }
                        })
                }}>Follow</button>}
                </div>
                </span>
                        <span>
                <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
                </span>
                <span>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
                </span>
                </span>
                    </div>)
                }
            </div>
        </div>
    );
};
export default Users;