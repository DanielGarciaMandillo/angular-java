package com.actions.impl;

import java.util.ArrayList;

import com.actions.Actions;
import com.item.Item;

public class ActionsImpl implements Actions {
	
	ArrayList<Item> itemList = new ArrayList<Item>();
	
	public ArrayList<Item> getItems() {
		return itemList;
	}

	public void addItem(Item item) {
		itemList.add(item);
	}

}
