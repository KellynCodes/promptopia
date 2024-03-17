"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useSearchParams } from "next/navigation";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [prompt, setPrompt] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompts/${promptId}`);
      const data = await res.json();
      setPrompt({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const EditPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (!promptId) return alert("Prompt not found.");
    try {
      const res = await fetch(`/api/prompts/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: prompt.prompt,
          tag: prompt.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={prompt}
      setPost={setPrompt}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default EditPrompt;
