import { NextPage } from "next";
import React from "react";
import { AdminMain } from "../admin/AdminMain";
import { AdminStoreProvider } from "../admin/data/context";
import { HeaderDefault } from "../defaultheader/Header";
import { SEO } from "../common/SEO";
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
