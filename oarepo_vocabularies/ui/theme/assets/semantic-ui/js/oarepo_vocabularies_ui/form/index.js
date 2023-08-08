import React from "react";
import { createFormAppInit } from "@js/oarepo_ui/forms";
import VocabularyForm from "./VocabularyForm";

export const overriddenComponents = {
  "FormApp.layout": VocabularyForm,
};

export * from './components'
export * from './VocabularyForm'
export * from './VocabularyFormSchema'

createFormAppInit(overriddenComponents);