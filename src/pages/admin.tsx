import { NextPage } from "next";
import React from "react";
import { AdminPage } from "../admin/AdminPage";
import { AdminStoreProvider } from "../admin/data/context";
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
          main={<AdminPage />}
        />
      </AdminStoreProvider>
    </>
  );
};

export default Admin;
