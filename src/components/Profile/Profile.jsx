import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onLogout,
  onUpdateProfile,
  onOpenUpdateModal,
}) {
  return (
    <section className="profile">
      <SideBar
        onLogout={onLogout}
        onUpdateProfile={onUpdateProfile}
        onOpenUpdateModal={onOpenUpdateModal}
      />
      <ClothesSection
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
export default Profile;
