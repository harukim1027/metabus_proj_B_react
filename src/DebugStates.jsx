function DebugStates(props) {
  return (
    <div>
      <pre className="bg-blue-100 hover:bg-yellow-200 text-xxs  p-1 border border-gray-400 overflow-x-scroll h-72">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default DebugStates;
