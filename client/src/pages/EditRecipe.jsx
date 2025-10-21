import Sidebar from "../components/Sidebar";
import Logo from "../assets/Logo.png";
import BackIcon from "../assets/back.png";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "../assets/edit icon.png";
import "../styles/EditRecipe.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditRecipe = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    servings: "",
    cookingTime: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: null,
    category: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("servings", formData.servings);
      formDataToSend.append("cookingTime", formData.cookingTime);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("ingredients", formData.ingredients);
      formDataToSend.append("instructions", formData.instructions);
      formDataToSend.append("category", formData.category);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      await axios.put(
        `http://localhost:5000/api/recipes/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/my-recipes");
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    try {
      const fetchRecipe = async () => {
        const res = await axios.get(
          `http://localhost:5000/api/recipes/id/${id}`
        );
        setRecipe(res.data);
        setImagePreview(res.data.image);

        setFormData({
          title: res.data.title,
          servings: res.data.servings,
          cookingTime: res.data.cookingTime,
          description: res.data.description,
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
          image: res.data.image,
          category: res.data.category,
        });
      };

      fetchRecipe();
    } catch (err) {
      console.log("ERROR FETCHING RECIPE:", err.message);
    }
  }, [id]);

  return (
    <div className="page-wrapper">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="page-wrapper-content"
        style={{
          marginLeft: collapsed ? "70px" : "340px",
          transition: "margin-left 0.3s",
        }}
      >
        <div
          className="header"
          style={{
            left: collapsed ? "70px" : "340px",
            right: 0,
            transition: "left 0.3s",
          }}
        >
          <div className="logo-webName">
            <img src={Logo} alt="Logo" className="web-logo" />
            <p className="web-name">Let'em Cook</p>
          </div>
        </div>

        <div className="edit-recipe-wrapper">
          <button
            className="back-to-discover-btn"
            onClick={() => navigate("/my-recipes")}
          >
            <img src={BackIcon} alt="back-icon" />
            Back
          </button>

          <div className="add-new-recipe-card">
            <form className="add-recipe-form-container" onSubmit={handleSubmit}>
              <h2 className="edit-recipe-title">
                <img src={EditIcon} alt="edit-icon" /> Edit Recipe
              </h2>
              <div className="add-recipe-form">
                <div className="left-inputs">
                  <div className="input-row-1">
                    <div className="input-group">
                      <label htmlFor="recipe-title">Recipe Title *</label>
                      <input
                        type="text"
                        id="recipe-title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="servings">Servings *</label>
                      <input
                        type="number"
                        id="servings"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="cooking-time">Cooking Time (mins)*</label>
                      <input
                        type="text"
                        id="cooking-time"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-row-2">
                    <div className="input-group wide">
                      <label htmlFor="description">Description *</label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="category">Category *</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        className="category"
                        onChange={handleChange}
                      >
                        <option value="main course">Main Course</option>
                        <option value="side dish">Side Dish</option>
                        <option value="dessert">Dessert</option>
                        <option value="appetizer">Appetizer</option>
                        <option value="salad">Salad</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="soup">Soup</option>
                        <option value="beverage">Beverage</option>
                        <option value="snack">Snack</option>
                        <option value="drink">Drink</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-row-3">
                    <div className="input-group wide">
                      <label htmlFor="ingredients">
                        Ingredients (comma-seperated) *
                      </label>
                      <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div class="input-row">
                      <div className="input-group">
                        <label htmlFor="recipeImage">Change Image *</label>
                        <input
                          type="file"
                          id="recipeImage"
                          name="recipeImage"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                        />
                        {imagePreview && (
                          <div className="image-preview">
                            <img
                              src={imagePreview}
                              alt="Recipe preview"
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "4px",
                              }}
                            />
                            <button onClick={handleClear}>Remove</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-inputs">
                  <div className="input-group instructions-group">
                    <label htmlFor="instructions">Instructions *</label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="share-recipe-btn">
                    Update Recipe
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
