"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Modal from "../Modals/Modal";
import InputText from "../shared/inputText";
import PrimaryButton, { SecondaryButton } from "../shared/Buttons";
import "./index.scss";
import useNetwork from "@/hooks/useNetwork";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { allUsersAtom } from "@/state/Atom";
import UserComponent from "../user/UserComponent";
import LoaderBar from "../shared/LoaderBar";

type Props = {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const SearchUser = ({ onClose }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useRecoilState(allUsersAtom);
  const { getRequest, loading } = useNetwork();

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
                  <UserComponent user={user} key={user.user_id} />
                </li>
              );
            })
          ) : (
            <LoaderBar />
          )}
        </ul>
      </div>
    );
  }, [filter, users, loading]);

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
