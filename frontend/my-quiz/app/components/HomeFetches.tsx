import { GetTags } from "@/actions/GetTags";
import { getAuthors } from "@/actions/TopAuthors";
import { GetSuggesstions } from "@/actions/getSuggesstions";
import React from "react";
import BecauseYouFollowed from "./BecauseYouFollowed";
import Authors from "./Authors";
import Filter from "./Filter";
import MaxWidthWrapper from "./MaxWidthWrapper";

const HomeFetches = async () => {
  const [authors, suggesstions, categories] = await Promise.all([getAuthors(), GetSuggesstions(), GetTags()]);

  return (
    <section>
      {suggesstions && (
        <BecauseYouFollowed DELAY={4000} text="Based On Your " span="Followings :" suggesstions={suggesstions} />
      )}
      <Authors DELAY={5000} text="Top" span=" Authors :" suggesstions={authors} />
      <Filter categories={categories} />
    </section>
  );
};

export default HomeFetches;
