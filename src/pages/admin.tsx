import { NextPage } from "next";
import React from "react";
import { AdminMain } from "../admin-main/AdminMain";
import { AdminStoreProvider } from "../admin-main/data/context";
import { HeaderDefault } from "../defaultheader/Header";
import { SEO } from "../layout/SEO";
import { LayoutBuilder } from "../layout/LayoutBuilder";
import { Navigation } from "../navigation/Navigation";

const Admin: NextPage = () => {
  return (
    <>
      <SEO title="Admin" canonical="/admin" />
      <AdminStoreProvider>
        <LayoutBuilder
          header={<HeaderDefault />}
          nav={<Navigation />}
          main={<AdminMain />}
        />
      </AdminStoreProvider>
    </>
  );
};

export default Admin;
