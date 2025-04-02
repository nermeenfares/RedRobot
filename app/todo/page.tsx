
import ClientTodo from '../ui/todo/ClientTodo';
import CustomTabs from '@/app/ui/todo/customTabs'
import MixedTodo from '../ui/todo/MixedTodo';
import ServerTodo from '../ui/todo/ServerSideTodo';



export default function Page() {
  const tabs = [
    {
      id: 'server',
      title: 'Server',
      content: (
        <ServerTodo/>
      ),
    },
    {
      id: 'client',
      title: 'Client',
      content: (
       <ClientTodo/>
      ),
    },
    {
      id: 'mixed',
      title: 'Mixed',
      content: (
       <MixedTodo/>
      ),
    },
  ];

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Todo List App</h1>
      <div className="max-w-3xl mx-auto">
        <CustomTabs tabs={tabs} defaultTab="server" />
      </div>
    </main>
  );
}