<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApplicationController extends Controller
{
    public function __invoke()
    {
        return view('admin.layouts.app');
    }

    public function getUsers()
    {
        $users = User::all();
        return $users;
    }

    public function storeUsers(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        return $user;
    }
    public function updateUsers($id, Request $request)
    {
        // dd($id);
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->has('password')) {
            $user->password = $request->password;
        }
        $user->save();
        return $user;
    }
}
