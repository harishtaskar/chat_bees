"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allUsersAtom,
  connectionsAtom,
  recallConnectionAPI,
} from "@/state/Atom";
import UserComponent from "../user/UserComponent";
import LoaderBar from "../shared/LoaderBar";
import UserIcon from "../icons/Icons";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchUser = ({ onClose }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const setRecallConnectionsAPI = useSetRecoilState(recallConnectionAPI);
  const { getRequest, loading } = useNetwork();
  const { postRequest } = useNetwork();
  const connections = useRecoilValue(connectionsAtom);

  const connection_ids = connections?.map((user) => user.user_id);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest("/user/users", {
        filter: filter.toLowerCase().trim(),
      });
      if (response?.res === "ok") {
        setUsers(response.users);
      }
    };
    const debounce = setTimeout(() => {
      fetchUsers();
    }, 800);
    return () => {
      clearTimeout(debounce);
    };
  }, [filter]);

  const inputChangeHandler = useCallback((name: string, value: any) => {
    setFilter(value);
  }, []);

  const addConnectionHandler = useCallback(
    async (user: IUser) => {
      const response = await postRequest("/chat/start-conversation", {
        reciever_name: user.username,
        reciever_id: user.user_id,
      });
      if (response.res === "ok") {
        toast.success("User Connected");
        setRecallConnectionsAPI((prev) => !prev);
      } else {
        toast.error(response.msg);
      }
    },
    [users]
  );

  const renderBody = useMemo(() => {
    return (
      <div className="body">
        <div className="body__search_form">
          <InputText
            id="filter"
            onChange={inputChangeHandler}
            inputType="text"
            placeHolder="🔎 Search by username or occupation..."
            require={false}
            value={filter}
          />
        </div>
        <ul className="body__list">
          {users ? (
            users?.map((user: any) => {
              return (
                <li key={user.user_id} className="body__list__list_item">
                  <div className={`user`}>
                    <div>
                      <UserIcon insectIndex={user?.iconIndex || 0} />
                    </div>
                    <div className="user__container">
                      <div className={"user__container__first"}>
                        <span className="user__container__first__title">
                          {user?.username}
                        </span>
                        <span className="user__container__first__subtitle">
                          {user?.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!connection_ids?.includes(user.user_id) ? (
                    <SecondaryButton
                      name={"Add"}
                      onClick={() => addConnectionHandler(user)}
                      style={{ width: "fit-content", padding: "0px 15px" }}
                    />
                  ) : (
                    <PrimaryButton
                      name={"Added"}
                      onClick={() => {}}
                      style={{ width: "fit-content", padding: "0px 15px" }}
                      isDisable={true}
                    />
                  )}
                </li>
              );
            })
          ) : (
            <LoaderBar />
          )}
        </ul>
      </div>
    );
  }, [filter, users, loading, connection_ids]);

  return (
    <Modal
      body={renderBody}
      onClose={onClose}
      modalstyle={{
        width: "100%",
        margin: "0px 20px",
        maxWidth: "600px",
        height: "59vh",
      }}
    />
  );
};

export default SearchUser;
