"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { rulesQuery, endpoint } from "@/api/GQL";
import { GraphQLClient } from "graphql-request";
import { setRules } from "@/redux/reducer/globalSettingReducer";
import type { RulesResponse } from "@/type";

export default function GlobalApiProvider({ children }) {
  const dispatch = useDispatch();
  const language = useSelector(
    (state: RootState) => state.globalSettingReducer.language
  );

  useEffect(() => {
    const fetchRules = async () => {
      try {
        if (!language) return;
        const client = new GraphQLClient(endpoint);
        const data: RulesResponse = await client.request(rulesQuery(language));
        const payload = data.posts.nodes;
        if (payload.length > 0) {
          dispatch(setRules(payload));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRules();
  }, [language, dispatch]);

  return <>{children}</>;
}
