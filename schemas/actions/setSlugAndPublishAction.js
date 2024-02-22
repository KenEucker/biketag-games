// setAndPublishAction.js

import { useState, useEffect } from "react";
import { useDocumentOperation } from "sanity";
import { createClient } from '@sanity/client'
import { useToast } from "@sanity/ui";

const sanityClientConfig = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET,
  // token: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_TOKEN,
  useCdn: true,
});

export default function SetSlugAndPublishAction(props) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isPublishing, setIsPublishing] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [isPublishing, props.draft]);

  return {
    disabled: publish.disabled,
    label: isPublishing ? "Publishing…" : "Publish",
    onHandle: async () => {
      // This will update the button text
      setIsPublishing(true);

      const client = sanityClientConfig;
      let slug = props.draft.name || props.type,
        duplicateErrorMessage = null,
        doPublish = true,
        setNameTo = null;

      // Only set the slug once
      if (
        !(
          props.draft.slug &&
          props.draft.slug.current &&
          props.draft.slug.current.length
        )
      ) {
        switch (props.type) {
          default:
            slug = slug.toLowerCase().replace(/\s/gi,'');
            break;
        }

        /// Ensure that the slug is unique for this document
        let existingSlug = null;
        await client
          .fetch(`*[_type == "${props.type}" && slug.current == $slug][0]`, {
            slug,
          })
          .then((foundSlug) => (existingSlug = foundSlug));

        if (existingSlug) {
          duplicateErrorMessage =
            duplicateErrorMessage ||
            `The slug [${slug}] is not unique for the document type [${props.type}], please edit the document.`;
          toast.push({ status: "error", title: duplicateErrorMessage });
          setIsPublishing(false);
          doPublish = false;
          // throw new Error(duplicateErrorMessage)
        } else {
          /// Set the name
          if (setNameTo) {
            patch.execute([{ set: { name: setNameTo } }]);
          }

          // Set the slug
          patch.execute([{ set: { slug: { _type: "slug", current: slug } } }]);
        }
      }

      if (doPublish) {
        // Perform the publish
        publish.execute();
      }

      // Signal that the action is completed
      props.onComplete();
    },
  };
}
