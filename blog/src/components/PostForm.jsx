import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bucketService from "../services/bucketService";
import dbService from "../services/DbService";
import { addPost, setLoading } from "../store/postSlice";
import { Box, CircularProgress } from "@mui/material";
import { ButtonComponent, Input, RTE, Select } from "./index";
import { useCallback, useEffect } from "react";
import { theme } from "./Theme/Theme";
import { Text } from "./Text";

export const PostForm = ({ post }) => {
  const loading = useSelector((state) => state.posts.loading);
  console.log("state loading is ", loading);

  const { register, handleSubmit, setValue, getValues, control, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data) => {
    try {
      dispatch(setLoading(true));

      if (post) {
        const file = (await data.featuredImage[0])
          ? await bucketService.uploadFile(data.featuredImage[0])
          : null;

        console.log("previous fike", file);

        if (file) {
          bucketService.deleteFile(post.featuredImage);

          // dispatch(deleteImage(post.featuredImage));
        }

        const dbPost = await dbService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });
        console.log("file from edit", file);

        if (dbPost) {
          // if (file) {
          //   dispatch(addImage(file));
          // }
          console.log("db post", dbPost);

          dispatch(addPost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
         const file = await bucketService.uploadFile(data.featuredImage[0]);

        if (file) {
          const fileID = file.$id;
          data.featuredImage = fileID;
          const dbPost = await dbService.createPost({
            ...data,
            userID: userData.$id,
          });
          if (dbPost) {
 
            dispatch(addPost(dbPost));
            // dispatch(addImage(file));

            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error occurred while submitting the post:", error);
    } finally {
      dispatch(setLoading(false));  
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(submit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,

              p: {xs:5,sm:5,lg:10},
              border: `1px solid ${theme.palette.primary.main}`,
              mt: 10,
              borderRadius: 5,
            }}
          >
            <Box>
              <Text
                text="Add a New Post"
                variant="h4"
                sx={{ fontWeight: "bold" }}
                gutterBottom
              />
              <Text
                text="Fill out the form below to create a new post."
                paragraph
              />
            </Box>
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
              fullWidth
            />
            <label>Slug :</label>
            <Input
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              fullWidth
            />

            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
              fullWidth
            />
            <label>Blog Image :</label>

            <Input
              // label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredImage", { required: !post })}
              fullWidth
            />
            {post && (
              <Box sx={{width:300}}>
                <img
                  src={bucketService.filePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                  style={{maxHeight:'100%',maxWidth:'100%'}}
                />
              </Box>
            )}
            <label>Status :</label>

            <Select
              options={["active", "inactive"]}
              // label="Status"
              className="mb-4"
              {...register("status", { required: true })}
              value={getValues("status")}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <ButtonComponent
                size="large"
                type="submit"
                sx={{
                  textTransform: "none",
                  color: "white",
                }}
                text={post ? "Update" : "Submit"}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
