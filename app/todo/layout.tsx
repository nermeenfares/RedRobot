import TodoNavbar from "../ui/todo/TodoNavbar";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen flex-row">
      <div className="w-full flex-none md:w-64">
        <TodoNavbar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}