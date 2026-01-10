import { Session } from "next-auth";
import { SheetsApiResponse } from "@/types/sheets";

import SignOutButton from "./signOutButton";
import SignInButton from "./signInButton";
import RequestForm from "./requestForm";
import VariantButton from "../VariantButton";

interface NavbarProps {
  session: Session | null;
  layoutVariant: number;
  handleLayoutChange: () => void;
  handleGridDataUpdate: (v: SheetsApiResponse) => void;
}

const Navbar = ({
  session,
  layoutVariant,
  handleLayoutChange,
  handleGridDataUpdate,
}: NavbarProps) => {
  return (
    <nav>
      <div className="grid grid-cols-[1fr_auto_1fr]">
        <p>LOGO</p>
        <RequestForm onGridDataUpdate={handleGridDataUpdate} />
        <div className="flex items-center justify-end gap-3">
          <VariantButton
            variant={layoutVariant}
            handleClick={handleLayoutChange}
          />
          {session?.user ? <SignOutButton /> : <SignInButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
